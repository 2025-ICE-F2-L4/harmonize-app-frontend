const readline = require('readline');
const axios = require('axios');

const API_BASE = 'http://localhost:3000';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentToken = null;

async function mainMenu() {
  console.log('\n=== MENU GŁÓWNE ===');
  console.log('1. Rejestracja');
  console.log('2. Logowanie');
  console.log('3. Utwórz rodzinę');
  console.log('4. Dołącz do rodziny');
  console.log('5. Utwórz aktywność');
  console.log('6. Pokaż aktywności');
  console.log('7. Przypisz użytkownika do aktywności');
  console.log('0. Wyjście');

  const choice = await askQuestion('Wybierz opcję: ');
  
  switch(choice) {
    case '1': await register(); break;
    case '2': await login(); break;
    case '3': await createFamily(); break;
    case '4': await joinFamily(); break;
    case '5': await createActivity(); break;
    case '6': await listActivities(); break;
    case '7': await assignToActivity(); break;
    case '0': process.exit(0);
    default: console.log('Nieprawidłowy wybór');
  }
  
  await mainMenu();
}

async function register() {
  console.log('\n=== REJESTRACJA ===');
  const name = await askQuestion('Imię: ');
  const email = await askQuestion('Email: ');
  const password = await askQuestion('Hasło: ');
  const role = await askQuestion('Rola (Parent/Child): ');

  try {
    const response = await axios.post(`${API_BASE}/api/signup`, {
      name, email, password, role
    });
    console.log('Rejestracja udana!');
    console.log('Token:', response.data.token);
    currentToken = response.data.token;
  } catch (error) {
    console.error('Błąd rejestracji:', error.response?.data || error.message);
  }
}

async function login() {
  console.log('\n=== LOGOWANIE ===');
  const email = await askQuestion('Email: ');
  const password = await askQuestion('Hasło: ');

  try {
    const response = await axios.post(`${API_BASE}/api/login`, {
      email, password
    });
    console.log('Logowanie udane!');
    console.log('Token:', response.data.token);
    currentToken = response.data.token;
  } catch (error) {
    console.error('Błąd logowania:', error.response?.data || error.message);
  }
}

async function createFamily() {
  if (!currentToken) {
    console.log('Najpierw się zaloguj!');
    return;
  }

  console.log('\n=== TWORZENIE RODZINY ===');
  const name = await askQuestion('Nazwa rodziny: ');

  try {
    const response = await axios.post(`${API_BASE}/api/families`, {
      name
    }, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    console.log('Rodzina utworzona!');
    console.log('Kod dostępu:', response.data.family.access_code);
  } catch (error) {
    console.error('Błąd tworzenia rodziny:', error.response?.data || error.message);
  }
}

async function joinFamily() {
  if (!currentToken) {
    console.log('Najpierw się zaloguj!');
    return;
  }

  console.log('\n=== DOŁĄCZANIE DO RODZINY ===');
  const access_code = await askQuestion('Kod dostępu: ');

  try {
    const response = await axios.post(`${API_BASE}/api/families/join`, {
      access_code
    }, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    console.log('Dołączono do rodziny!');
    console.log('Nazwa rodziny:', response.data.family.name);
  } catch (error) {
    console.error('Błąd dołączania:', error.response?.data || error.message);
  }
}

async function createActivity() {
  if (!currentToken) {
    console.log('Najpierw się zaloguj!');
    return;
  }

  console.log('\n=== TWORZENIE AKTYWNOŚCI ===');
  const name = await askQuestion('Nazwa: ');
  const description = await askQuestion('Opis: ');
  const datetime = await askQuestion('Data i czas (YYYY-MM-DDTHH:MM:SS): ');
  const family_id = await askQuestion('ID rodziny: ');

  try {
    const response = await axios.post(`${API_BASE}/api/activities`, {
      name, description, datetime, family_id
    }, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    console.log('Aktywność utworzona!');
    console.log('ID:', response.data.activity._id);
  } catch (error) {
    console.error('Błąd tworzenia aktywności:', error.response?.data || error.message);
  }
}

async function listActivities() {
  if (!currentToken) {
    console.log('Najpierw się zaloguj!');
    return;
  }

  const family_id = await askQuestion('Podaj ID rodziny: ');

  try {
    const response = await axios.get(`${API_BASE}/api/families/${family_id}/activities`, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    console.log('\nAKTYWNOŚCI:');
    response.data.activities.forEach(activity => {
      console.log(`- ${activity.name} (${activity.datetime})`);
    });
  } catch (error) {
    console.error('Błąd pobierania aktywności:', error.response?.data || error.message);
  }
}

async function assignToActivity() {
  if (!currentToken) {
    console.log('Najpierw się zaloguj!');
    return;
  }

  console.log('\n=== PRZYPISYWANIE DO AKTYWNOŚCI ===');
  const activityId = await askQuestion('ID aktywności: ');
  const userId = await askQuestion('ID użytkownika: ');

  try {
    const response = await axios.post(`${API_BASE}/api/activities/${activityId}/assign`, {
      userId
    }, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    console.log('Przypisano użytkownika!');
  } catch (error) {
    console.error('Błąd przypisywania:', error.response?.data || error.message);
  }
}

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Start aplikacji
console.log('=== TESTER API HARMONIZE ===');
mainMenu();