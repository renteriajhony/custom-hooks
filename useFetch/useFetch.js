/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const localCache = {};

export const useFetch = (url) => {
  const initialState = {
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState(initialState);
  };

  const getFetch = async () => {
    if (localCache[url]) {
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }

    setLoadingState();
    const resp = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
