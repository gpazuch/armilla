import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SinkService } from '../../services/sink.service';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-sink',
  templateUrl: './sink.component.html',
  styleUrls: ['./sink.component.scss']
})
export class SinkComponent {
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  sinkForm = this.fb.group({
    name: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    description: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    tags: ['{{name.firstName}}: {{name.lastName}}', Validators.required],
    backend: ['Prometheus', Validators.required],
    count: [5, Validators.required],
  });

  backends = [
    {name: 'Prometheus', value: 'Prometeus'},
  ];

  constructor(
      private fb: FormBuilder,
      private sink: SinkService,
      private names: WordService,
  ) {
  }

  getHint(expr: string) {
    return this.names.randomWord(expr);
  }

  makeSink(name: string, description: string, backend: string, tags: string, config: string) {
    return {name: faker.fake(name), tags: faker.fake(tags)};
  }

  batchAgents() {
    const {name, tags, agentCount} = this.agentForm.value;
    const agents = new Array(agentCount).map((_, i) => this.makeSink(name, tags));

    return agents;
  }

  onSubmit(): void {
    const agents = this.batchAgents();
    this.agent.batchCreate(agents);
  }
}