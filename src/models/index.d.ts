//placeholder voor typescript
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    gebruikerId?: string;
  }
}
