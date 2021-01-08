import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncoesPage } from './funcoes.page';

describe('FuncoesPage', () => {
  let component: FuncoesPage;
  let fixture: ComponentFixture<FuncoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
