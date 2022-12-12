import { Component } from '@angular/core';

class Tovar {
    name : string;
    id : number;
    description : string;
    amount : number;
    recivedDate : string;
    type : string;
    
    constructor(name : string, id : number, description : string, amount : number, recivedDate : string, type : string) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.recivedDate = recivedDate;
        this.type = type;
    }
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.styles.css'],
  templateUrl: './app.component.html'
})

export class AppComponent {
    // переменные для скрытия интерфейса редактирования и добавления новых компонентов
    Add_open = false;
    Change_open = false;

    Name = '';
    // привязанные через ngModel двухсторонней связью
    name = '';
    id = 0;
    description = '';
    amount = 0;
    recivedDate = '';
    type = '';
    // заполнение массива обьектами (потом переделать в json)
    Items = [
        new Tovar('Гречка', 1, 'Вкусная гречка', 10, '05.06.2000', 'Полезно для здоровья'),
        new Tovar('Макароны', 2, 'Вкусные макароны', 50, '09.01.2012', 'Будет полезно в доме'),
        new Tovar('Киндеры', 3, 'Сладкие шоколадки', 69, '15.12.2014', 'Полезно для работы'),
        new Tovar('Опарыши', 4, 'Вкусные?', 5, '20.01.2022', 'Будет полезно на рыбалке')
    ];
    
    Submit () {
        // проверка на пустые поля
        if (this.name == '' || this.description == '' || this.amount == 0 || this.recivedDate == '' || this.type == '') {
            return;
        }
        // проверка на уникальность айди
        for (let i = 0; i < this.Items.length; i++) {
            if (this.Items[i].id == this.id) {
                return;
            }
        }
        this.Items.push(new Tovar(this.name, this.id, this.description, this.amount, this.recivedDate, this.type));
    }
    
    Delete (id : number) {
        // если айди есть в списке, не добавляем, айди уникальный
        for (let i = 0; i < this.Items.length; i++) {
            if (this.Items[i].id == id) {
                this.Items.splice(i, 1);
                return;
            }
        }
    }
    
    Change (id : number) {
        this.Change_open = true;
        // если айди есть в списке, не добавляем, айди уникальный
        for (let i = 0; i < this.Items.length; i++) {
            if (this.Items[i].id == id) {
                this.name = this.Items[i].name;
                this.id = this.Items[i].id;
                this.description = this.Items[i].description;
                this.amount = this.Items[i].amount;
                this.recivedDate = this.Items[i].recivedDate;
                this.type = this.Items[i].type;
                return;
            }
        }
    }
    
    Apply () {
        // изменение
        for (let i = 0; i < this.Items.length; i++) {
            if (this.Items[i].id == this.id) {
                this.Items[i].name = this.name;
                this.Items[i].id = this.id;
                this.Items[i].description = this.description;
                this.Items[i].amount = this.amount;
                this.Items[i].recivedDate = this.recivedDate;
                this.Items[i].type = this.type;
                return;
            }
        }
    }
    
    add_open () {
        // открывает / закрывает форму добавления нового товара
        this.Add_open = !this.Add_open;
    }
    
    change_open() {
        // открывает / закрывает изменение товара
        this.Change_open = !this.Change_open;
    }
}
