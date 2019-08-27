import axios from 'axios';
import { BASE_SERVER_URL } from '../constants';

/*
 * params:
 *   type:
 *      string from the following list: ['top', 'new', 'ask', 'show', 'jobs']
 *   pageNum:
 *      int 1 or greater representing the desired page number
 *
 * returns:
 *    array of objects, each of which represent a story (does NOT include comments)
 *
 */
export async function getPage(type, pageNum) {
  const data = await axios.get(
    BASE_SERVER_URL + '/' + PREFIXES[type] + '?page=' + pageNum.toString()
  );
  return data.data;
}

/*
 * params:
 *    id:
 *        int representing the id of the desired item (for my purposes, either a story or a comment)
 *
 * returns:
 *    object representing the item, INCLUDING a nested array of its comment objects
 */
export async function getItem(id) {
  const data = await axios.get(BASE_SERVER_URL + '/item/' + id.toString());
  return data.data;
}

/*
 * params:
 *    id:
 *        string username
 *
 * returns:
 *    object representing the user
 */
export async function getUser(id) {
  const data = await axios.get(BASE_SERVER_URL + '/user/' + id);
  return data.data;
}

const PREFIXES = {
  top: 'news',
  new: 'newest',
  ask: 'ask',
  show: 'show',
  jobs: 'jobs'
};

// NOTES: 'json' is default for responseType of config obj
// I believe that axios attempts a JSON.stringify --> TODO: check when this occurs
