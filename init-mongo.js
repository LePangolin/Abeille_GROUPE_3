db.createUser({
    user: "admin",
    pwd: "abeille",
    roles: [
      {
        role: "readWrite",
        db: "abeille",
      },
    ],
  });