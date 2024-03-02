import {URL} from './BaseUrl';

export const AllShift = async () => {
  try {
    let data = await fetch(`${URL}/shifts`);
    data = await data.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const BookedShift = async id => {
  try {
    let data = await fetch(`${URL}/shifts/${id}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CancelBookedShift = async id => {
  try {
    let data = await fetch(`${URL}/shifts/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    return error;
  }
};
