import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDialogueComponent } from './property-dialogue.component';

describe('PropertyDialogueComponent', () => {
  let component: PropertyDialogueComponent;
  let fixture: ComponentFixture<PropertyDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
