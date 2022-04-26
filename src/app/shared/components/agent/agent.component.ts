import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AgentService} from '../../services/agent.service';
import faker from "@faker-js/faker";
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {
  form = this.fb.group({
    name: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    tags: ['{{name.firstName}}: {{name.lastName}}', Validators.required],
    count: [5, Validators.required],
  });

  constructor(
      private fb: FormBuilder,
      private agent: AgentService,
      private words: WordService,
  ) {
  }

  getHint(expr: string) {
    return this.words.randomWord(expr);
  }

  makeAgent(name: string, tags: string) {
    return {
      name: this.words.createWord(name),
      tags: this.words.createWord(tags),
    };
  }

  batchAgents() {
    const {name, tags, count} = this.form.value;
    const agents = new Array(count).map((_, i) => this.makeAgent(name, tags));

    return agents;
  }

  onSubmit(): void {
    const agents = this.batchAgents();
    this.agent.batchCreate(agents);
  }
}
