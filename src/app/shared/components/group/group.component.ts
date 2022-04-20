import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  groupForm = this.fb.group({
    name: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    description: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    tags: ['{{name.firstName}}: {{name.lastName}}', Validators.required],
    count: [5, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private group: GroupService,
    private words: WordService,
  ) {}

  getHint(expr: string) {
    return this.words.randomWord(expr);
  }

  makeGroup(name: string, description: string, tags: string) {
    return {
      name: this.words.createWord(name),
      description: this.words.createWord(description),
      tags: this.words.createWord(tags),
    };
  }

  batchGroups() {
    const {name, tags, description, groupCount} = this.groupForm.value;
    const groups = new Array(groupCount)
      .map((_, i) => this.makeGroup(name, description,tags));

    return groups;
  }

  onSubmit(): void {
    const groups = this.batchGroups();
    this.group.batchCreate(groups);
  }
}
