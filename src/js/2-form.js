const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('input', onFormInput);
formRef.addEventListener('submit', onSubmitForm);

const formData = { email: '', message: '' };

function onFormInput({ target: { name, value } }) {
  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onLoadPage() {
  const dataFromLS = localStorage.getItem('feedback-form-state');
  if (!dataFromLS) return;
  const parsedData = JSON.parse(dataFromLS);
  formData.email = parsedData.email;
  formData.message = parsedData.message;
  formRef.elements.email.value = parsedData.email;
  formRef.elements.message.value = parsedData.message;
}

function onSubmitForm(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    console.log('Please fill in all fields.');
    return;
  }
  console.log({ email: formData.email, message: formData.message });

  localStorage.removeItem('feedback-form-state');
  formRef.reset();
}

onLoadPage();