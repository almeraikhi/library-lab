import { BookUpdateLog } from '@repo/prisma/client';
import dayjs from 'dayjs';
import { updatedDiff } from 'deep-object-diff';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookLogs } from '~/features/books/api/useBookLogs';

export const ChangeLog = ({ log }: { log: BookUpdateLog }) => {
  const change = useMemo(() => {
    const diff = updatedDiff(log.oldData, log.newData);
    return diff;
  }, [log]);

  useEffect(() => {
    console.log('change is', change);
  }, [change]);

  // Check if the change object has only the updatedAt property
  if (Object.keys(change).length === 1 && change.updatedAt) {
    return null;
  }

  // Format the change log to show old and new values, excluding updatedAt
  const changeEntries = Object.entries(change)
    .filter(([key]) => key !== 'updatedAt') // Exclude updatedAt
    .map(([key, value]) => {
      const oldValue = log.oldData[key];
      return (
        <div key={key}>
          <strong>{key}:</strong> from <em>{JSON.stringify(oldValue)}</em> to{' '}
          <em>{JSON.stringify(value)}</em>
        </div>
      );
    });

  return (
    <div className='p-2 border border-gray-200 rounded-md'>
      <div>{dayjs(log.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
      {changeEntries}
    </div>
  );
};

export const BookUpdateLogs = () => {
  const { id } = useParams();
  const { data: logs, isLoading: isLoadingLogs } = useBookLogs({ id: id! });
  const navigate = useNavigate();

  if (isLoadingLogs) return <div>Loading...</div>;

  if (!logs) return <div>No logs found</div>;

  if (logs.length === 0) return <div>No changes, yet.</div>;

  return (
    <div className='flex flex-col gap-2'>
      {logs.map((log) => (
        <ChangeLog key={log.id} log={log} />
      ))}
    </div>
  );
};
