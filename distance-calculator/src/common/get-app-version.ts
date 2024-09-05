import packageJSON from '../../package.json';

const getAppVersion = (): string => {
  return packageJSON.version;
};

export default getAppVersion;
