import * as path from 'path';
import { Readable } from 'stream';
import CreateUserDTO from '../../src/dto/users.dto';
import CreateRoleDTO from '../../src/dto/role.dto';
import CreatePinDTO from '../../src/dto/pin.dto';
import CreateBoardDTO from '../../src/dto/board.dto';
import CreateNotesDTO from '../../src/dto/notes.dto';
import CreateNotificationDTO, {
  chatSubscriber,
} from '../../src/dto/notification.dto';
import CreateMessagesDTO from '../../src/dto/messages.dto';
import CreateHistoryDTO from '../../src/dto/history.dto';
import CreateCommentDTO from '../../src/dto/comment.dto';
import CreateChatDTO from '../../src/dto/chat.dto';
import { createTokenDTO } from '../../src/dto/token.dto';

const mockRoles: CreateRoleDTO[] = [
  {
    id: 1,
    title: 'admin',
    description: 'You can ban some user, which has a bad behavior 😇',
  },
  {
    id: 2,
    title: 'user',
    description:
      ' You can do more interesting things in application: add/create pins/boards, send comments and more ',
  },
];

const mockPhotos: Express.Multer.File[] = [
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'mario_art',
    size: 88,
    filename: 'mario_art.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['mario_art.jpg']),
    destination: '',
    path: path.join(__dirname, '..', 'assets', 'pinPhotos', 'mario_art.jpg'),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'uncharted4_art',
    size: 88,
    filename: 'uncharted4_art.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['uncharted4_art.jpg']),
    destination: '',
    path: path.join(
      __dirname,
      '..',
      'assets',
      'pinPhotos',
      'uncharted4_art.jpg',
    ),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'TLOU2',
    size: 88,
    filename: 'TLOU2.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['TLOU2.jpg']),
    destination: '',
    path: path.join(__dirname, '..', 'assets', 'boardPhotos', 'TLOU2.jpg'),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'TLOU_Ellie_with_Joel',
    size: 88,
    filename: 'TLOU_Ellie_with_Joel.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['TLOU_Ellie_with_Joel.jpg']),
    destination: '',
    path: path.join(
      __dirname,
      '..',
      'assets',
      'pinPhotos',
      'TLOU_Ellie_with_Joel.jpg',
    ),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'Ellie',
    size: 88,
    filename: 'Ellie.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['Ellie.jpg']),
    destination: '',
    path: path.join(__dirname, '..', 'assets', 'notePhotos', 'Ellie.jpg'),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'typescript_art',
    size: 88,
    filename: 'typescript_idea.png',
    mimetype: 'image/png',
    stream: Readable.from(['typescript_idea.png']),
    destination: '',
    path: path.join(
      __dirname,
      '..',
      'assets',
      'notePhotos',
      'typescript_idea.png',
    ),
    buffer: Buffer.from(''),
  },
  {
    fieldname: '',
    encoding: 'base64',
    originalname: 'moose_art',
    size: 88,
    filename: 'moose_art.jpg',
    mimetype: 'image/jpg',
    stream: Readable.from(['moose_art.jpg']),
    destination: '',
    path: path.join(__dirname, '..', 'assets', 'pinPhotos', 'moose_art.jpg'),
    buffer: Buffer.from(''),
  },
];

const mockUsers: CreateUserDTO[] = [
  {
    id: 1,
    username: 'Arkadiy228',
    firstname: 'Arkasha',
    lastname: 'Skv',
    password: 'Somepassword123',
    email: 'mymail.some@mail.ru',
    role: mockRoles[0],
    refreshToken: '672y378ryfy7886t2yu3y7eguw',
  },
  {
    id: 2,
    username: 'Grishechka18',
    firstname: 'Hrisha',
    lastname: 'Pavlov',
    password: 'utkanos98',
    email: 'mailer.utka@mail.ru',
    role: mockRoles[1],
    refreshToken: '273r2yu897yu2u899y7hu8ugy',
  },
  {
    id: 3,
    username: 'Anonimus123',
    firstname: 'Anonim',
    lastname: 'Zobavarzev',
    password: 'zobaboba123',
    email: 'star_butterfly@mail.ru',
    role: mockRoles[1],
    refreshToken: '873hu2yr83y2igu2u8pufoji',
  },
  {
    id: 4,
    username: 'Rustacean',
    firstname: 'Rust',
    lastname: 'Lover',
    password: 'Draker998',
    email: 'nathan.drake@mail.ru',
    photo: 'Rust.gif',
    role: mockRoles[0],
    refreshToken: '12a94et21offazibirw5wyy',
  },
  {
    id: 5,
    username: 'StarButterfly',
    firstname: 'Star',
    lastname: 'Butterfly',
    password: 'markosterpel2raza',
    email: 'butterfly.marko-domination@gmail.com',
    photo: 'Marko.png',
    role: mockRoles[0],
    refreshToken: '11474ha19oifabibilkhljv',
  },
];

const mockPins: CreatePinDTO[] = [
  {
    id: 1,
    title: 'Mario art',
    author: mockUsers[0],
    photo: mockPhotos[1],
    description: 'Mario feature art',
    tags: ['Mario', 'Nintendo'],
  },
  {
    id: 2,
    title: 'Uncharted 4 art',
    author: mockUsers[1],
    photo: mockPhotos[0],
    description: 'Uncharted 4 | 2016 !!!',
    tags: ['Games', 'Uncharted 4', 'Naughty Dog'],
  },
];

const mockBoards: CreateBoardDTO[] = [
  {
    id: 1,
    title: 'Lost Ellie..',
    author: mockUsers[0],
    visibility: true,
    photo: mockPhotos[2],
  },
  {
    id: 2,
    title: 'Ellie with Joel - Last time',
    author: mockUsers[1],
    visibility: false,
    photo: mockPhotos[3],
  },
];

const mockNotes: CreateNotesDTO[] = [
  {
    id: 1,
    board: mockBoards[0],
    photos: [mockPhotos[4]],
    title: 'Drawning Ellie later...',
    text: 'I need to try to draw Ellie like that',
    status: 'In progress',
  },
  {
    id: 1,
    board: mockBoards[1],
    photos: [mockPhotos[5]],
    title: 'Typescript code',
    text: 'Hm, cool example of Typescript!)); I need to try copy that after..',
    status: 'Do it later',
  },
];

const mockNotifications: CreateNotificationDTO[] = [
  {
    id: 1,
    text: `Пользователь "${mockUsers[0].username}" сделал вас коллоборатором доски "${mockBoards[0].title}"`,
    event: 'Автор добавил вас в доску',
    author: mockUsers[0],
    user: mockUsers[1],
    channel: mockUsers[1].username,
    board: mockBoards[1],
  },
  {
    id: 2,
    text: `Пользователь "${mockUsers[1].username}" оценил ваш пин "${mockPins[0].title}"`,
    event: 'Лайк пина',
    author: mockUsers[1],
    user: mockUsers[0],
    channel: mockUsers[0].username,
    pin: mockPins[0],
  },
];

const mockMessages: CreateMessagesDTO[] = [
  {
    id: 1,
    owner: mockUsers[0],
    text: `Привет, как жизнь?`,
    time: new Date(),
    catcher: mockUsers[1],
  },
  {
    id: 2,
    owner: mockUsers[1],
    text: 'Привет, да тесты блин эти тупые unit пишу, ты?',
    time: new Date(),
    catcher: mockUsers[0],
  },
  {
    id: 3,
    owner: mockUsers[0],
    text: 'Ахахахха, строю микросервис с RabbitMQ 😎',
    time: new Date(),
    catcher: mockUsers[1],
  },
];

const mockChats: CreateChatDTO[] = [
  {
    id: 1,
    owner: mockUsers[0],
    title: mockUsers[1].username,
    catcher: mockUsers[1],
  },
  {
    id: 2,
    owner: mockUsers[0],
    title: mockUsers[2].username,
    catcher: mockUsers[2],
  },
];

const mockHistories: CreateHistoryDTO[] = [
  { id: 1, author: mockUsers[1], saved_media: mockPins[0] },
  { id: 2, author: mockUsers[0], saved_media: mockBoards[0] },
];

const mockJwtTokens: createTokenDTO[] = [
  {
    id: 1,
    token: 'someToken1',
    user: mockUsers[0],
  },
  {
    id: 2,
    token: 'someToken2',
    user: mockUsers[1],
  },
  {
    id: 3,
    token: 'someToken3',
    user: mockUsers[2],
  },
];

const mockComments: CreateCommentDTO[] = [
  { author: mockUsers[0], date: new Date(), text: 'КРУТО!', pin: mockPins[1] },
  {
    author: mockUsers[1],
    date: new Date(),
    text: 'Как-то не очень вышло 😄 ',
    pin: mockPins[0],
  },
];

const mockSubscribers: chatSubscriber[] = [
  { owner: mockUsers[0], catcher: mockUsers[1] },
  { owner: mockUsers[1], catcher: mockUsers[0] },
];

export {
  mockRoles,
  mockPhotos,
  mockUsers,
  mockPins,
  mockBoards,
  mockNotes,
  mockNotifications,
  mockMessages,
  mockJwtTokens,
  mockChats,
  mockHistories,
  mockSubscribers,
  mockComments,
};
