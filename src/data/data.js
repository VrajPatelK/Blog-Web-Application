const primaryMenu = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "SignIn",
    url: "/signin",
  },
  {
    name: "Profile",
    url: "/users",
  },
];

const searchMenu = ["Privacy", "Status", "Type"];
const privacyMenu = ["public", "private"];
const statusMenu = ["published", "pending"];
const typeMenu = ["all", "favourites", "recents"];

const followUsMenu = [
  {
    name: "Facebook",
    url: "#",
  },
  {
    name: "Instagram",
    url: "#",
  },
  {
    name: "You Tube",
    url: "#",
  },
  {
    name: "+91 9999 99999",
    url: "https://wa.me/(91{MOBILE-NUMBER})/",
    // e.g. : https://wa.me/919876543210/
    _blank: true,
  },
  {
    name: "abc@123gmail.com",
    url: "https://mail.google.com/mail/u/0/?fs=1&to={EMAIL-ID}&tf=cm",
    // e.g. : "https://mail.google.com/mail/u/0/?fs=1&to=abc@123gmail.com&tf=cm",
  },
];

const articles = [
  {
    _id: {
      $oid: "655c6229075d75fa67f155b8",
    },
    title: "Title2",
    description: "description2",
    publish_date: {
      $date: "2023-11-21T07:54:17.135Z",
    },
    tags: ["tag1", "tag2"],
    publisher: {
      $oid: "655acaa42c17c123a38ce4d7",
    },
    privacy: "public",
    status: "published",
    createdAt: {
      $date: "2023-11-21T07:54:17.146Z",
    },
    updatedAt: {
      $date: "2023-11-21T08:56:15.851Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "655c62bd541bc9813ed0244c",
    },
    title: "Title3",
    description: "description3",
    publish_date: {
      $date: "2023-11-21T07:56:45.775Z",
    },
    tags: [],
    publisher: {
      $oid: "655acaa42c17c123a38ce4d7",
    },
    privacy: "public",
    status: "published",
    createdAt: {
      $date: "2023-11-21T07:56:45.783Z",
    },
    updatedAt: {
      $date: "2023-11-21T07:56:45.783Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "655c62fa77211abea5b386b7",
    },
    title: "Title4",
    description: "description4",
    publish_date: {
      $date: "2023-11-21T07:57:46.072Z",
    },
    tags: [],
    publisher: {
      $oid: "655acaa42c17c123a38ce4d7",
    },
    privacy: "public",
    status: "published",
    createdAt: {
      $date: "2023-11-21T07:57:46.078Z",
    },
    updatedAt: {
      $date: "2023-11-21T07:57:46.078Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "655c630177211abea5b386ba",
    },
    title: "Title5",
    description: "description5",
    publish_date: {
      $date: "2023-11-21T07:57:53.912Z",
    },
    tags: [],
    publisher: {
      $oid: "655acaa42c17c123a38ce4d7",
    },
    privacy: "public",
    status: "published",
    createdAt: {
      $date: "2023-11-21T07:57:53.913Z",
    },
    updatedAt: {
      $date: "2023-11-21T07:57:53.913Z",
    },
    __v: 0,
  },
];

function getSelectOptions(menu) {
  //
  var options = menu.map((item) => {
    return {
      value: item,
      label: item,
    };
  });
  return options;
}

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
export {
  primaryMenu,
  followUsMenu,
  articles,
  searchMenu,
  privacyMenu,
  statusMenu,
  typeMenu,
  getSelectOptions,
  getOptions,
  postOptions,
  editOptions,
  deleteOptions,
};
