import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {Axios} from 'axios';
import {useEffect, useState} from 'react';
import RNRestart from 'react-native-restart';
import {useNavigation} from '@react-navigation/native';

export const useAxios = defaultConfig => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const request = axios.interceptors.request.use(async req => {
      const token = await AsyncStorage.getItem('user-data');
      if (token) {
        req.headers['Authorization'] = 'Bearer ' + token;
      }
      return req;
    });

    return () => {
      axios.interceptors.request.eject(request);
    };
  }, []);

  const fetchData = async config => {
    setLoading(true);
    try {
      var response = await axios({
        ...defaultConfig,
        ...config,
      });
      setData(response?.data);
    } catch (error) {
      console.log(error);

      if (error?.response?.status == 401) {
        AsyncStorage.clear();
        RNRestart.restart();
      }

      console.log(error.response);
      

      if (axios.isAxiosError(error)) {
        if (error.code === axios.AxiosError.ERR_NETWORK) {
          navigation.navigate('ErrorScreen', {
            message: 'Network Error Please Try To Connect!',
          });
          setError('Network Error Please Try To Connect!');
        } else if (error.code === axios.AxiosError.ERR_BAD_REQUEST) {
          setError('Invalid Request Type');
        }
        if (error.response.status === 500) {
          navigation.navigate('ErrorScreen', {
            message: 'Internal Server Error Please Try After Some Time!',
          });
          setError('Internal Server Error Please Try After Some Time!');
        }
      }
    } finally {
      setLoading(false);
    }
    return response.data;
  };

  return {
    fetchData,
    loading,
    data,
    error,
  };
};
