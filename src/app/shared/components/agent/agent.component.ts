import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnChanges {
  agentForm = this.fb.group({
    name: [null, Validators.required],
    tagKey: [null, Validators.required],
    tagValue: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private agent: AgentService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const { name } = changes
  }

  onSubmit(): void {
    const header = this.auth.getHeaders();
  }
}
