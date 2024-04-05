import { Card } from '@tremor/react';

export function CardNumbers({title,nbr}) {
  return (
    <Card
      className="mx-auto max-w-xs"
      decoration="top"
      decorationColor="indigo"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content capitalize">{title}</p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{nbr}</p>
    </Card>
  );
}