// Type da action que salva email no estado global
export const EMAIL_TYPE = 'EMAIL_TYPE';

// Type da action que faz requisição da API
export const REQUEST_COIN = 'REQUEST_COIN';
export const REQUEST_COIN_SUCESS = 'REQUEST_COIN_SUCESS';
export const REQUEST_COIN_FAILURE = 'REQUEST_COIN_FAILURE';

// Type da action que pega os estados locais de WalletForm e manda para o global
export const SAVE_TYPE = 'SAVE_TYPE';

//  Action que salva email no estado global
export const actionEmail = (email) => ({ type: EMAIL_TYPE, email });

// action que faz requisição da API
const requestISSCurrencies = () => ({ type: REQUEST_COIN });

const receiveISSCurrenciesSucess = (currencies) => ({
  type: REQUEST_COIN_SUCESS, currencies,
});

const receiveISSCurrenciesFailure = (error) => ({ type: REQUEST_COIN_FAILURE, error });

export const fetchISSCurrencies = () => async (dispatch) => {
  dispatch(requestISSCurrencies());

  try {
    const ISS_URL_API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(ISS_URL_API);
    const data = await response.json();
    dispatch(receiveISSCurrenciesSucess(data));
  } catch (error) {
    console.log('error: ', error);
    dispatch(receiveISSCurrenciesFailure(error.message));
  }
};
// Termina aqui

//  Action que pega os estados locais de WalletForm e manda para o global
export const actionSaveInfo = (currencies, expense) => ({
  type: SAVE_TYPE, currencies, expense,
});

// Action para nova requisição para cotação atual
export const fetchISSSave = (expense) => async (dispatch) => {
  dispatch(requestISSCurrencies());

  try {
    const ISS_URL_API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(ISS_URL_API);
    const data = await response.json();
    dispatch(actionSaveInfo(data, expense));
  } catch (error) {
    console.log('error: ', error);
    dispatch(receiveISSCurrenciesFailure(error.message));
  }
};
