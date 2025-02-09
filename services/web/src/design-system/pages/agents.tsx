import {Button, Table} from '@radix-ui/themes';

const Agents = () => {
  return (
    <Table.Root size={'2'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Agent</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Contract Addr.</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>APY %</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Trades</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Profitable Trades</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Spike Catcher</Table.RowHeaderCell>
          <Table.Cell>0xc0ff...4979</Table.Cell>
          <Table.Cell>8%</Table.Cell>
          <Table.Cell>32</Table.Cell>
          <Table.Cell>15</Table.Cell>
          <Table.Cell>
            <Button size={'1'}>Deposit</Button>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>High Volume Trader</Table.RowHeaderCell>
          <Table.Cell>0x78B2...6Bb8</Table.Cell>
          <Table.Cell>12%</Table.Cell>
          <Table.Cell>6</Table.Cell>
          <Table.Cell>5</Table.Cell>
          <Table.Cell>
            <Button size={'1'}>Deposit</Button>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Trend Rider</Table.RowHeaderCell>
          <Table.Cell>0x94c4...0EeA</Table.Cell>
          <Table.Cell>24%</Table.Cell>
          <Table.Cell>12</Table.Cell>
          <Table.Cell>6</Table.Cell>
          <Table.Cell>
            <Button size={'1'}>Deposit</Button>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Swing Trader</Table.RowHeaderCell>
          <Table.Cell>0x3CFB...d993</Table.Cell>
          <Table.Cell>19%</Table.Cell>
          <Table.Cell>18</Table.Cell>
          <Table.Cell>8</Table.Cell>
          <Table.Cell>
            <Button size={'1'}>Deposit</Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default Agents;
