const followUsMenu = [
  {
    name: "+91 87329 37702",
    url: "https://wa.me/(918732937702)/",
    _blank: true,
  },
  {
    name: "vraj.patel4801gmail.com",
    url: "https://mail.google.com/mail/u/0/?fs=1&to=vraj.patel4801gmail.com&tf=cm",
  },
];

const getOptions = { cache: "no-cache" };
const postOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const editOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};
const deleteOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

//
export { followUsMenu, getOptions, postOptions, editOptions, deleteOptions };
