import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            votes: action.payload.votes,
          };
        }
        return item;
      });
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdotesService.getAll();
    dispatch(setAnecdotes(data));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew({
      content,
      votes: 0,
    });
    dispatch(createAnecdote(newAnecdote));
  };
};

export const updateVotes = (id, votes) => {
  return async (dispatch) => {
    const data = await anecdotesService.updateVotes({ id, votes: votes + 1 });
    dispatch(voteAnecdote(data));
  };
};

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
