import { useSelector, useDispatch } from "react-redux";
import { updateVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const search = state.filter.toLowerCase();

    if (search) {
      return state.anecdotes.filter((item) =>
        item.content.toLowerCase().includes(search)
      );
    }

    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const vote = (id, votes) => {
    dispatch(updateVotes(id, votes));
    const anecdote = anecdotes.find((item) => item.id === id);
    dispatch(setNotification(`You voted '${anecdote.content}'`, 2000));
  };

  const sorted_anecdotes = () => {
    let data = [...anecdotes];
    return data.sort((a, b) => b.votes - a.votes);
  };

  return (
    <div>
      {sorted_anecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.votes)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
