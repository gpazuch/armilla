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
  agentForm = this.fb.group({
    name: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    tags: ['{{name.firstName}}: {{name.lastName}}', Validators.required],
    count: [5, Validators.required],
  });

  constructor(
      private fb: FormBuilder,
      private agent: AgentService,
      private names: WordService,
  ) {
  }

  getHint(expr: string) {
    return this.names.randomWord(expr);
  }

  makeAgent(name: string, tags: string) {
    return {name: faker.fake(name), tags: faker.fake(tags)};
  }

  batchAgents() {
    const {name, tags, agentCount} = this.agentForm.value;
    const agents = new Array(agentCount).map((_, i) => this.makeAgent(name, tags));

    return agents;
  }

  onSubmit(): void {
    const agents = this.batchAgents();
    this.agent.batchCreate(agents);
  }
}
