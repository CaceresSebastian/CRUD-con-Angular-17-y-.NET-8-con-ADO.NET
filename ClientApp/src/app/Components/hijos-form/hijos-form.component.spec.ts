import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijosFormComponent } from './hijos-form.component';

describe('HijosFormComponent', () => {
  let component: HijosFormComponent;
  let fixture: ComponentFixture<HijosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HijosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
