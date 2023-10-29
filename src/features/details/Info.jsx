import styled from 'styled-components';
import { useNeighbors } from './use-neighbors';
import { Helmet } from 'react-helmet-async';

const Wrapper = styled.section`
  margin-top: 2rem;
  width: 100%;
`;

const InfoImage = styled.img`
  display: block;
  max-width: 320px;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

const Link = styled.a`
  cursor: pointer;
  color: var(--colors-text);
  font-weight: var(--fw-normal);
  transition: 0.3s linear;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }
`;

export const Info = (props) => {
  const {
    population,
    region,
    subregion,
    name: { common: nativeName, official: name },
    flags: { png: flag },
    // translations,
    // currencies = [],
    // languages = [],
    coatOfArms: { png: coatOfArms },
    maps: { googleMaps: googleMap, openStreetMaps },
    translations = {},
    borders = [],
    capital,
    push,
  } = props;

  // const capital = props.capital[0];
  const translationsArr = Object.entries(translations);

  const neighbors = useNeighbors(borders);

  return (
    <Wrapper>
      <Helmet>
        <title>{translations.rus.official}</title>
        <meta name="description" content={translations.rus.official} />
      </Helmet>
      <div>
        <InfoTitle>
          {name}
          {' ( '}
          {translations.rus.official}
          {' )'}
        </InfoTitle>
        <InfoImage src={flag} alt={name} />
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
            <ListItem>
              <Meta>
                <b>Border Countries</b>
                {!borders.length ? (
                  <span>There is no border countries</span>
                ) : (
                  <TagGroup>
                    {neighbors.map((countryName) => (
                      <Tag
                        key={countryName}
                        onClick={() => push(`/country/${countryName}`)}
                      >
                        {countryName}
                      </Tag>
                    ))}
                  </TagGroup>
                )}
              </Meta>
            </ListItem>
            <ListItem>
              <b>CoatOfArms:</b>
              <a href={coatOfArms} target='_blank' rel='noreferrer'>
                <InfoImage src={coatOfArms} alt={name} />
              </a>
            </ListItem>
            <ListItem>
              <b>Look on the map: </b>
              <Link href={googleMap} target='_blank' rel='noreferrer'>
                Google Map
              </Link>
              {'  '}
              <Link href={openStreetMaps} target='_blank' rel='noreferrer'>
                Open Street Maps
              </Link>
            </ListItem>

            <ListItem>
              <b>Different languages:</b>
              <br />
              {translationsArr.map((d) => (
                <span key={d}>
                  {d[0]} - {d[1].official} - {d[1].common}
                  <br />
                </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
      </div>
    </Wrapper>
  );
};
