import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAllComponent } from './post-all.component';

describe('PostAllComponent', () => {
  let component: PostAllComponent;
  let fixture: ComponentFixture<PostAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
