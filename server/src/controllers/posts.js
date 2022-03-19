let postId = 1; //id init value

// posts array init data
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];
/* write posts
POST /posts
{title, body}
*/
const write = (req, res) => {
  const { title, body } = req.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  res.send(post);
};
//GET /posts
const list = (req, res) => {
  res.send(posts);
};
//GET /posts/:id
const read = (req, res) => {
  const { id } = req.params;
  // req.params:string, param.id:number
  //return param that satisfy param.id.toString()===id
  const post = posts.find((param) => param.id.toString() === id);
  if (!post) {
    res.status(404).send({ message: 'can not find the post' });
    return;
  }
  res.send(post);
};
//DELETE /posts/:id
const remove = (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((param) => param.id.toString() === id);
  if (index === -1) {
    res.status(404).send({ message: 'can not find the post' });
    return;
  }
  posts.splice(index, 1);
  res.status(204); //No Content
};

const replace = (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((param) => param.id.toString() === id);
  if (index === -1) {
    res.status(404).send({ message: 'can not find the post' });
    return;
  }
  posts[index] = {
    id,
    ...req.body,
  };
  res.send(posts[index]);
};

const update = (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((param) => param.id.toString() === id);
  if (index === -1) {
    res.status(404).send({ message: 'can not find the post' });
    return;
  }
  posts[index] = {
    ...posts[index],
    ...req.body,
  };
  res.send(posts[index]);
};

//For postman api test
// const printInfo = (req, res) => {
//   res.send(
//     (req.body = {
//       method: req.method,
//       path: `posts${req.path}`,
//       params: req.params,
//     }),
//   );
// };

module.exports = { write, list, read, remove, replace, update };
