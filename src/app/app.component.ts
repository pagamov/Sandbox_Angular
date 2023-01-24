import { Component } from '@angular/core';

export const Tags = ['Работа', 'Дом', 'Семья', 'Здоровье'];

export const Options = ['Важно', 'Важно но лень', 'Не важно'];

export interface DialogData {
  description: string;
  priority: string;
  time: string;
}

export enum Arrors {up = '↑', down = '↓', def = '○'};

export const Text = {
  home: {
    welcome: 'Welcome',
    needlogin: 'You need to be logged in!',
    cwith: 'Create with',
    modal: 'modal form',
    reactive: 'reactive form',
    task: 'Task',
    priority: 'Priority',
    time: 'Time',
    edit: 'Editing with',
    delete: 'Deleting',
    del: 'delete',
    submit: 'Submit',
    tags: 'Tags',
    tag_def_opt: 'Pick a tag',
    prio_def_opt: 'Change a priority',
    plus: '+',
    minus: '-'
  },
  login: {
    username: 'Username',
    name_req: 'Name is required.',
    pass: 'Password',
    pass_req: 'Password is required.',
    log_in: 'Log in'
  },
  sign: {
    name: 'Your name',
    name_req: 'Nane is required.',
    user: 'Login',
    user_req: 'Login is required.',
    pass: 'Password',
    pass_req: 'Password is required.',
    sign: 'Sign Up'
  },
  change_dialog: {
    description: 'Description:',
    priority: 'Priority:',
    time: 'Time:', 
    cancel: 'Cancel',
    change: 'Change'
  },
  create_dialog: {
    description: 'Description:',
    priority: 'Priority:',
    time: 'Time:',
    cancel: 'Cancel',
    create: 'Create'
  },
  app: {
    home: 'Home',
    login: 'Login',
    sign: 'Sign'
  }
};

@Component({
  selector: 'app-root',
  styleUrls: ['../styles.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  text = Text.app;
}
