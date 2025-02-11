import { BookUpdateLog } from '@repo/prisma/client';
import dayjs from 'dayjs';
import { updatedDiff, detailedDiff } from 'deep-object-diff';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookLogs } from '~/features/books/api/useBookLogs';

export const ChangeLog = ({ log }: { log: BookUpdateLog }) => {
  const { added, deleted, updated } = useMemo(() => {
    console.log('old data', log.oldData);
    console.log('new data', log.newData);
    const detailed = detailedDiff(log.oldData, log.newData);
    console.log('detailed', detailed);
    const diff = updatedDiff(log.oldData, log.newData);
    return detailed;
  }, [log]);

  const change = useMemo(() => {
    return { ...updated, ...added, ...deleted };
  }, [updated, added, deleted]);

  useEffect(() => {
    console.log('change is', change);
  }, [change]);

  // Check if the change object has only the updatedAt property
  if (Object.keys(change).length === 1 && change.updatedAt) {
    return null;
  }

  // Format the change log to show old and new values, excluding updatedAt
  const changeEntries = Object.entries(change)
    .filter(([key]) => !['updatedAt', 'authorId'].includes(key)) // Exclude updatedAt
    .map(([key, value]) => {
      if (key === 'genres') {
        console.log('genres here...');
        const oldGenres = log.oldData[key];
        const genresNames = oldGenres.map((g) => g.genre.name);
        const newGenres = log.newData[key];
        const newGenresNames = newGenres.map((g) => g.genre.name);
        return (
          <div key={key}>
            <strong>{key}:</strong>{' '}
            <em className='opacity-60'>{genresNames.join(', ')}</em> &rarr;{' '}
            <em>{newGenresNames.join(', ')}</em>
          </div>
        );
      }

      if (key === 'author') {
        console.log('author here...');
        const oldAuthor = log.oldData[key];
        const newAuthor = log.newData[key];
        return (
          <div key={key}>
            <strong>{key}:</strong>{' '}
            <em className='opacity-60'>{oldAuthor.name}</em> &rarr;{' '}
            <em>{newAuthor.name}</em>
          </div>
        );
      }

      const oldValue = log.oldData[key];
      const formattedValue =
        key === 'publishedAt'
          ? dayjs(value).format('DD-MM-YYYY')
          : JSON.stringify(value);
      const formattedOldValue =
        key === 'publishedAt'
          ? dayjs(oldValue).format('DD-MM-YYYY')
          : JSON.stringify(oldValue);
      return (
        <div key={key}>
          <strong>{key}:</strong>{' '}
          <em className='opacity-60'>{formattedOldValue}</em> &rarr;{' '}
          <em>{formattedValue}</em>
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
