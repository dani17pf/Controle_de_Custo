import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbatecimentoPage } from './list-abatecimento.page';

describe('ListAbatecimentoPage', () => {
  let component: ListAbatecimentoPage;
  let fixture: ComponentFixture<ListAbatecimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbatecimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbatecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
