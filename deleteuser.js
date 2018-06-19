const rp = require('request-promise');

const url = 'https://helloroo.org/api';

deleteUser(4);

async function deleteUser(id) {
  let media = await rp({
    method: 'GET',
    uri: url + '/media',
    json: true
  });
  let tasks = await rp({
    method: 'GET',
    uri: url + '/clients/' + id + '/tasks'
  });
  tasks = JSON.parse(tasks);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    for (let j = 0; j < media.length; j++) {
      const m = media[j];
      if (m.task_id === task.id) {
        await rp({ // eslint-disable-line
          method: 'DELETE',
          uri: url + '/media/' + m.id
        });
      }
    }
    await rp({ // eslint-disable-line
      method: 'DELETE',
      uri: url + '/tasks/' + task.id
    });
  }
  let requests = await rp({
    method: 'GET',
    uri: url + '/clients/' + id + '/requests'
  });
  requests = JSON.parse(requests);
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    await rp({ // eslint-disable-line
      method: 'DELETE',
      uri: url + '/requests/' + request.id
    });
  }
  let messages = await rp({
    method: 'GET',
    uri: url + '/clients/' + id + '/messages'
  });
  messages = JSON.parse(messages);
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    await rp({ // eslint-disable-line
      method: 'DELETE',
      uri: url + '/messages/' + message.id
    });
  }
  rp({
    method: 'DELETE',
    uri: url + '/clients/' + id
  });
}