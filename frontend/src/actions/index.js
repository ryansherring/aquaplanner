import axios from 'axios';
import { CREATE_GARDEN, SIGN_UP, SIGN_IN, SIGN_OUT } from './actionTypes';

const api = 'http://localhost:4000';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const signOut = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const createUser = (userValues) => async (dispatch) => {
  axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, this.state)
      .then(res => {
        console.log(res);
        this.close()
        this.props.history.push('/login');
      }).catch(err => {
        console.log(err.response);
      }); // on submit
}

export const createGardens = () => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/plots/create`, this.state, {withCredentials: true})
  .then(res => {
    console.log(res);
    this.props.getPlots();
    this.close();
  }).catch(err => {
    console.log(err.response);
  }); // on submit
  const data = response.data.reduce((allData, { slug, title, acf }) => ({ ...allData, [slug]: { title: title.rendered, ...acf }}), {});

  dispatch({ type: CREATE_GARDEN, payload: data });
};

export const openModal = (modalContent) => {
  return {
    type: MODAL_OPEN,
    payload: modalContent
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
};
