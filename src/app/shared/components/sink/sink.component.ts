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
  form = this.fb.group({
    name: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    description: ['{{name.firstName}}_{{name.lastName}}', Validators.required],
    tags: ['{{name.firstName}}: {{name.lastName}}', Validators.required],
    backend: ['Prometheus', Validators.required],
    count: [5, Validators.required],
  });

  backends = [
    {name: 'Prometheus', value: 'prometheus'},
  ];

  constructor(
      private fb: FormBuilder,
      private sink: SinkService,
      private words: WordService,
  ) {
  }

  getHint(expr: string) {
    return this.words.randomWord(expr);
  }

  makeSink(values: any) {
    const {name, description, backend, tags} = values;
    return {
      name: this.words.createWord(name),
      backend,
      description: this.words.createWord(description),
      tags: this.words.createWord(tags),
    };
  }

  batchAgents(values: any) {
    const {count} = values;
    const agents = new Array(count).map((_, i) => this.makeSink(values));

    return agents;
  }

  onSubmit(): void {
    const agents = this.batchAgents(this.form.value);
    this.sink.batchCreate(agents);
  }
}