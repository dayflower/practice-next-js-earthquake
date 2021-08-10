import { useRouter } from 'next/dist/client/router';
import { Table } from 'semantic-ui-react';
import useSWR from 'swr';
import { QuakeEvent } from '../models/event';
import { getQuakeList } from '../repositories/quake';

const MAX_EVENTS = 10;

const QuakeEventRow = ({ event }: { event: QuakeEvent }): JSX.Element => {
  const router = useRouter();

  const handleClick = (e: Event): void => {
    e.preventDefault();
    router.push(`/quake/${event.id}`);
  };

  return (
    <Table.Row onClick={handleClick}>
      <Table.Cell>{event.areaName}</Table.Cell>
      <Table.Cell>{event.intensities[0].maxIntensity}</Table.Cell>
      <Table.Cell>{event.magnitude}</Table.Cell>
      <Table.Cell>{event.at.format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
    </Table.Row>
  );
};

export const QuakeEventList = (): JSX.Element => {
  const { data: quakeEvents, error: errorEvents } = useSWR(
    '/api/quake/events',
    getQuakeList
  );

  if (errorEvents) {
    return <div>Failed to fetch quake events</div>;
  }
  if (!quakeEvents) {
    return <div>Loading ...</div>;
  }

  const events = quakeEvents.slice(0, MAX_EVENTS);

  return (
    <div className="ui cards">
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>震源</Table.HeaderCell>
            <Table.HeaderCell>最大震度</Table.HeaderCell>
            <Table.HeaderCell>マグニチュード</Table.HeaderCell>
            <Table.HeaderCell>発生日時</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {events.map((event) => (
            <QuakeEventRow key={event.id} event={event}></QuakeEventRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default QuakeEventList;
