import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentosPage } from './abastecimentos.page';

describe('AbastecimentosPage', () => {
  let component: AbastecimentosPage;
  let fixture: ComponentFixture<AbastecimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbastecimentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
