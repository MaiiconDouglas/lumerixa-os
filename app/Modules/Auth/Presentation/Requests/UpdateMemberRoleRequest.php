<?php
declare(strict_types=1);

namespace App\Modules\Auth\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // ACL check can be here or in controller middleware
    }

    public function rules(): array
    {
        return [
            'role_slug' => ['required', 'string', 'exists:roles,slug'],
        ];
    }
}
