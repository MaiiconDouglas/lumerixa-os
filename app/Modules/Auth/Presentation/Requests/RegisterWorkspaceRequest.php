<?php
declare(strict_types=1);

namespace App\Modules\Auth\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterWorkspaceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Limpa pontuação antes de validar.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'cpf' => preg_replace('/\D/', '', $this->cpf),
            'cnpj' => $this->cnpj ? preg_replace('/\D/', '', $this->cnpj) : null,
            'cep' => preg_replace('/\D/', '', $this->cep),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
            'cpf' => ['required', 'string', 'size:11'], // Agora validamos os números puros
            'tenant_name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'size:6'],
            'account_type' => ['required', 'in:PJ,PF'],
            'cnpj' => ['required_if:account_type,PJ', 'nullable', 'string', 'max:18'],
            'cep' => ['required', 'string', 'size:8'],
            'logradouro' => ['required', 'string'],
            'numero' => ['required', 'string'],
            'bairro' => ['required', 'string'],
            'cidade' => ['required', 'string'],
            'uf' => ['required', 'string', 'size:2'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Insira seu nome completo para prosseguir.',
            'email.required' => 'O e-mail corporativo é fundamental para a segurança.',
            'email.email' => 'O formato do e-mail não parece válido.',
            'password.required' => 'A senha mestra é obrigatória.',
            'password.min' => 'A senha deve conter no mínimo 8 caracteres.',
            'cpf.required' => 'O CPF é obrigatório para identificação.',
            'cpf.size' => 'O CPF deve conter exatamente 11 dígitos.',
            'tenant_name.required' => 'Dê um nome ao seu Workspace para gerar o contexto.',
            'code.required' => 'O código de segurança é obrigatório.',
            'code.size' => 'O código enviado ao e-mail possui 6 dígitos.',
            'cnpj.required_if' => 'Para contas empresariais, o CNPJ é indispensável.',
            'cep.required' => 'O CEP é necessário para a localização fiscal.',
            'cep.size' => 'O CEP deve conter 8 dígitos numéricos.',
            'numero.required' => 'Indique o número do endereço (ou S/N).',
            'logradouro.required' => 'O endereço deve ser preenchido (valide o CEP).',
            'uf.size' => 'A UF deve conter 2 caracteres.',
        ];
    }
}
