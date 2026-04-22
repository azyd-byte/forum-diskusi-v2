const BASE_URL = 'https://forum-api.dicoding.dev/v1';

//login
async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.token;
}

//register
async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.user;
}

//GET profil sendiri
async function getOwnProfile() {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.user;
}

//GET users
async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.users;
}

//GET semua thread
async function getThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  // return list thread
  return data.data.threads;
}

//GET detail thread
async function getThreadDetail(id) {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  // return detail thread + komentar di dalamnya
  return data.data.detailThread;
}

//buat komentar
async function createComment(threadId, content) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.comment;
}

//buat thread
async function createThread({ title, body, category }) {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ title, body, category }),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.thread;
}

//GET leaderboard
async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data.leaderboards;
}

//Up Vote
async function upVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

//Down Vote
async function downVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

//Neutral Vote
async function neutralVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function upVoteComment(threadId, commentId) {
  return fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
}

async function downVoteComment(threadId, commentId) {
  return fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
}

async function neutralVoteComment(threadId, commentId) {
  return fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
}

export {
  login,
  register,
  getOwnProfile,
  getUsers,
  getThreads,
  getThreadDetail,
  createComment,
  createThread,
  getLeaderboards,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
};
