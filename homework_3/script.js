const wsUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output"),
    chatOutput = document.querySelector(".chat_output"),
    textInput = document.querySelector(".input_text"),
    submitInput = document.querySelector(".submit"),
    geo = document.querySelector(".input_geolocation");

  let webSocket = new WebSocket(wsUrl);
  //прописываем события WebSocket
  webSocket.onopen = (e) => {
    infoOutput.innerText = "Соединение установлено";
  };
  webSocket.onmessage = (event) => {
    writeToChat(event.data, true);
  };
  webSocket.onerror = function (error) {
    infoOutput.innerText = `При передаче данных произошла ошибка ${error.message}`;
  };
  webSocket.onclose = function (event) {
    if (event.wasClean) {
      infoOutput.innerText = `Соединение закрыто чисто, код=${event.code} причина=${event.reason}`;
    } else {
      // например, сервер убил процесс или сеть недоступна
      infoOutput.innerText = "Соединение прервано";
    }
  };
  // вешаем обработчик на кнопку, выполняя функцию
  submitInput.addEventListener("click", sendMessage);

  // функция проверки/отправления сообщения в чат,
  // очищение поля ввода сообщения
  function sendMessage() {
    if (!textInput.value) return;
    webSocket.send(textInput.value);
    writeToChat(textInput.value, false);
    textInput.value = "";
  }
  //функция рендеринга сообщения в чат
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class='${isRecieved ? "recieved" : "sent"}'>${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
  // вешаем обработчик с функцией геолокации
  geo.addEventListener("click", getLocation);

  function getLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true,
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
    } else {
      infoOutput.innerText = "Ваш браузер не поддерживает функцию определения местоположения";
    }
  }
  // функция вывода ссылки с координатами в чат
  function locationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToChat(`<a href="${link}" target="_blank">Гео-локация</a>`);
  }

  function locationError() {
    infoOutput.innerText = "При получении местоположения произошла ошибка";
  }
}
document.addEventListener("DOMContentLoaded", pageLoaded);
