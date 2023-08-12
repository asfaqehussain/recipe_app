import {Alert, Platform} from 'react-native';

import {ClientInstance} from '../utils/baseClient';
import {useState} from 'react';

const useGetVideos = () => {
  const [resdata, setResData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async (url: string, data?: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        const response = await ClientInstance.get(url);
        if (response) {
          setResData(response.data);
          setIsLoading(false);
          resolve(response.data);
        } else {
          setIsLoading(false);
          reject(response.data);
        }
      } catch (error) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  return {isLoading, resdata, fetchVideos};
};
export default useGetVideos;
