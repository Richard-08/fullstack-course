import { useMutation, useQueryClient } from "react-query";
import { createNew } from "../services/anecdotes";
import {
  useNotificationDispatch,
  setNotification,
} from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const data = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", data.concat(newAnecdote));
      dispatch(setNotification("New anecdote created"));
    },
    onError: (error) => {
      dispatch(setNotification(error.response.data.error));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
