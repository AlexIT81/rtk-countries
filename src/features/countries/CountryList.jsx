import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { List } from '../../components/List';
import { Card } from '../../components/Card';
import { useCountry } from './use-country';

const Title = styled.h2`
  text-align: center;
  font-family: var(--family);
  color: var(--colors-text);
  font-weight: var(--fw-bold);
  font-size: var(--fs-md);
`;

export const CountryList = () => {
  const navigate = useNavigate();
  const [countries, { status, error }] = useCountry();

  return (
    <>
      {error && <Title>Не могу получить данные!</Title>}
      {status === 'loading' && <Title>Загрузка...</Title>}
      {countries.length === 0 && status !== 'loading' && (
        <Title>Нету найденных стран!</Title>
      )}
      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name.official,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital[0],
                },
              ],
            };

            return (
              <Card
                key={c.flags.png}
                onClick={() => navigate(`/country/${c.name.official}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
