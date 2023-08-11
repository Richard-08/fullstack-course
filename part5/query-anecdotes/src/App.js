import { useQuery, useMutation, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, updateVotes } from "./services/anecdotes";

import {
  useNotificationDispatch,
  setNotification,
} from "./NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const voteMutation = useMutation(updateVotes, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      dispatch(setNotification(`anecdote '${data.content}' voted`));
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const anecdotes = useQuery("anecdotes", getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (anecdotes.isLoading) {
    return <div>Loading data...</div>;
  }

  if (anecdotes.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
