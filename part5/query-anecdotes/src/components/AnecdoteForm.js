import { useMutation, useQueryClient } from "react-query";
import { createNew } from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const data = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", data.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      return;
    }

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
