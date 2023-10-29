import { Info } from './Info';
import { useDetails } from './use-details';

export const CountryDetails = ({ name, navigate }) => {
  const { currentCountry, error, status } = useDetails(name);

  return (
    <>
      {status === 'loading' && <h2>Идет загрузка...</h2>}
      {error === 'loading' && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
