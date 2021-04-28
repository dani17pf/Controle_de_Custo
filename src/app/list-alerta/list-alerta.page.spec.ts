import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlertaPage } from './list-alerta.page';

describe('ListAlertaPage', () => {
  let component: ListAlertaPage;
  let fixture: ComponentFixture<ListAlertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlertaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
