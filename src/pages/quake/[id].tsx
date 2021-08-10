import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import useSWR from 'swr';
import { Areas } from '../../models/area';
import { Coordinates } from '../../models/coordinate';
import { QuakeCityIntensity, QuakeEvent } from '../../models/event';
import { getAreas } from '../../repositories/areas';
import { getCoordinates } from '../../repositories/coordinates';
import { getQuakeList } from '../../repositories/quake';

const QuakeEventViewer = (props: {
  event: QuakeEvent;
  areas: Areas;
  coordinates: Coordinates;
}): JSX.Element => {
  const [mapCoordinate, setMapCoordinate] = useState({
    ...props.event.coordinate,
  });

  const markers = props.event.intensities[0].cities.map((it) => {
    return {
      key: it.code,
      lng: props.coordinates[it.code].lng,
      lat: props.coordinates[it.code].lat,
      title: `${props.areas[it.code].name} 震度 ${it.maxIntensity}`,
    };
  });

  const handleClick =
    (intensity: QuakeCityIntensity) =>
    (e: Event): void => {
      e.preventDefault();

      setMapCoordinate(props.coordinates[intensity.code]);
    };

  const handleEpicenterClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    setMapCoordinate(props.event.coordinate);
  };

  const OSM = useMemo(
    () =>
      dynamic(() => import('../../components/OSM'), {
        loading: () => <p>loading ...</p>,
        ssr: false,
      }),
    []
  );

  const QuakeEventOnCity = (p: {
    intensity: QuakeCityIntensity;
  }): JSX.Element => {
    return (
      <Table.Row onClick={handleClick(p.intensity)}>
        <Table.Cell>{props.areas[p.intensity.code].name}</Table.Cell>
        <Table.Cell>{p.intensity.maxIntensity}</Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Grid>
      <Grid.Column width={4}>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>地域</Table.HeaderCell>
              <Table.HeaderCell>震度</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.event.intensities[0].cities.map((intensity) => (
              <QuakeEventOnCity key={intensity.code} intensity={intensity} />
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
      <Grid.Column width={6}>
        <a href="#" onClick={handleEpicenterClick}>
          震源 (lng: {props.event.coordinate.lng}, lat:{' '}
          {props.event.coordinate.lat})
        </a>

        <OSM
          position={mapCoordinate}
          epicenterPosition={props.event.coordinate}
          markers={markers}
          zoom={8}
        />
      </Grid.Column>
    </Grid>
  );
};

export const QuakeEventDetail = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { data: quakeEvents, error: errorEvents } = useSWR(
    '/api/quake/events',
    getQuakeList
  );

  const { data: areas, error: errorAreas } = useSWR(
    '/api/quake/areas',
    getAreas
  );

  const { data: coordinates, error: errorCoordinates } = useSWR(
    '/api/quake/coordinates',
    getCoordinates
  );

  if (errorEvents || errorAreas || errorCoordinates) {
    return <div>Failed to fetch quake event</div>;
  }
  if (!quakeEvents || !areas || !coordinates) {
    return <div>Loading ...</div>;
  }

  const event = quakeEvents.find((it) => it.id === id);

  return (
    <div className="ui container">
      <div>
        <Head>
          <title>
            Recent Earthquakes:
            {event.areaName} 震源 / 最大震度 {event.intensities[0].maxIntensity}{' '}
            / {event.at.format('YYYY-MM-DD HH:mm:ss')}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="ui header">
            {event.areaName}震源 / 最大震度 {event.intensities[0].maxIntensity}{' '}
            / {event.at.format('YYYY-MM-DD HH:mm:ss')}
          </h1>

          <QuakeEventViewer
            event={event}
            areas={areas}
            coordinates={coordinates}
          />
        </main>

        <footer></footer>

        <style jsx global>{`
          body {
            margin: 4rem;
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuakeEventDetail;
