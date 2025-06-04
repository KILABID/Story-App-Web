import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import AddStoryGuest from '../pages/add-story-guest/add-story-guest';
import AddStory from '../pages/add-story/add-story';
import DetailStoryPage from '../pages/detail-story/detail-story-page';
import AllStories from '../pages/all-stories/all-stories-page';
import BookmarksPage from '../pages/bookmarks/bookmarks-page';

const routes = {
  '/': new HomePage(),
  '/all-stories': new AllStories(),
  '/bookmarks': new BookmarksPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add-story-guest': new AddStoryGuest(),
  '/add-story': new AddStory(),
  '/detail/:id': new DetailStoryPage(),
};

export default routes;