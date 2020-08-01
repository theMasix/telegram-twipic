const urlParams = new URLSearchParams(window.location.search);

const datas = {
  body: urlParams.get('body'),
  profileURL: urlParams.get('profileURL'),
  name: urlParams.get('name'),
  id: urlParams.get('id'),
  timeCreated: urlParams.get('timeCreated'),
  dateCreated: urlParams.get('dateCreated'),
};

const elements = {
  body: document.querySelector('#body'),
  profileURL: document.querySelector('#profile-url'),
  name: document.querySelector('#name'),
  id: document.querySelector('#id'),
  timeCreated: document.querySelector('#time-created'),
  dateCreated: document.querySelector('#date-created'),
};

for (const elementName of Object.keys(elements)) {
  const element = elements[elementName];
  const data = datas[elementName];
  const nodeName = element.nodeName;

  if (nodeName === 'IMG') {
    element.src = data;
    continue;
  }

  element.innerHTML = data;
}
